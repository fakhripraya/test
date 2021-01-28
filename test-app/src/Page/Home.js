import {
    Title,
    LikeInput,
    InputTitle,
    SearchInput,
    InputContent,
    InputWrapper,
    InputContainer,
    MasterContainer,
} from './style/home-style'
import Table from '../Components/Table';
import { Movie } from '../APIS/MovieAPI';
import DateTimePicker from 'react-datetime-picker';
import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

function Home() {

    const [MovieDatas, setMovieDatas] = useState([])
    const [queryTitle, setqueryTitle] = useState("")
    const [queryShowTime, setqueryShowTime] = useState(null)
    const [queryLike, setqueryLike] = useState(0)
    const [queryLikeToggle, setqueryLikeToggle] = useState(2)

    useEffect(() => {

        // triggers the http get request to fetch movie data from the given url
        if (MovieDatas.length === 0) {
            trackPromise(
                Movie.get(
                    '/api/v1/movies',
                )
                    .then(response => {
                        if (response.status >= 200 && response.status < 300) {
                            setMovieDatas(response.data)
                        }
                    })
                    .catch(error => {
                        if (error.response.status !== 200) {

                            // dispatch the popUpModalChange actions to store the generic message modal state
                            // dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                        }
                    })
            );
        }

        return () => {

        }
    }, [queryTitle])

    function handleSearchTitle(e) {
        console.log(e.target.value);
        setqueryTitle(e.target.value)
    }

    function handleLike(e) {
        setqueryLike(e.target.value)
    }

    function handleLikeToggle() {

    }

    if (MovieDatas.length !== 0) {
        return (
            <MasterContainer>
                <Title>Movies</Title>
                <InputWrapper>
                    <InputContainer>
                        <InputTitle>
                            Search
                        </InputTitle>
                        <InputContent>
                            <SearchInput onChange={handleSearchTitle} />
                        </InputContent>
                    </InputContainer>
                    <InputContainer>
                        <InputTitle>
                            Show Time
                        </InputTitle>
                        <InputContent>
                            <DateTimePicker
                                onChange={setqueryShowTime}
                                value={queryShowTime}
                            />
                        </InputContent>
                    </InputContainer>
                    <InputContainer>
                        <InputTitle>
                            Likes
                        </InputTitle>
                        <InputContent>
                            <LikeInput type="number" onChange={handleLike} />
                        </InputContent>
                    </InputContainer>
                </InputWrapper>
                <Table>
                    {{
                        data: MovieDatas,
                        title: queryTitle,
                        like: queryLike,
                        showTime: queryShowTime,
                        likeToggle: queryLikeToggle,
                    }}
                </Table>
            </MasterContainer>
        );
    } else {
        return null
    }

}

export default Home;