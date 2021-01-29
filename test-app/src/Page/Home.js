import 'date-fns'
import {
    Title,
    LikeInput,
    InputTitle,
    AutoContent,
    SearchInput,
    InputContent,
    InputWrapper,
    AutoContainer,
    InputContainer,
    MasterContainer,
} from './style/home-style';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import Table from '../Components/Table';
import { Movie } from '../APIS/MovieAPI';
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

function Home() {

    const [MovieDatas, setMovieDatas] = useState([])
    const [autoDisplayTitle, setAutoDisplayTitle] = useState(false)
    const [autoDisplayTitleRender, setAutoDisplayTitleRender] = useState([])
    const [autoDisplayLike, setAutoDisplayLike] = useState(false)
    const [autoDisplayLikeRender, setAutoDisplayLikeRender] = useState([])
    const [queryTitle, setqueryTitle] = useState("")
    const [queryShowTime, setqueryShowTime] = useState(null)
    const [queryLike, setqueryLike] = useState(null)
    const [queryLikeToggle, setqueryLikeToggle] = useState(3)

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
                            // dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                        }
                    })
            );
        }

        return () => {

        }
    }, [queryTitle])

    function handleSearchTitle(e) {

        setqueryTitle(e.target.value);

        if (e.target.value.length > 0) {

            setAutoDisplayTitle(true);

            let slices = []

            MovieDatas.forEach((item, index) => {

                // case sensitive
                if (item.title.toUpperCase().includes(e.target.value.toUpperCase())) {
                    let tempSlices = [...slices, item]
                    slices = tempSlices
                }

            })

            setAutoDisplayTitleRender(slices)
        } else {
            setAutoDisplayTitle(false);
        }
    }

    function handleAutoTitle(item) {

        setqueryTitle(item);
        setAutoDisplayTitle(false);
    }

    function handleLike(e) {
        setqueryLike(e.target.value);
    }

    // function handleLikeToggle() {

    // }

    if (MovieDatas.length !== 0) {
        return (
            <MasterContainer>
                <Title>Movies</Title>
                <InputWrapper>
                    <InputContainer>
                        <InputTitle>
                            <span style={{ fontSize: '28px' }}>Search</span>
                        </InputTitle>
                        <InputContent>
                            <SearchInput type="text" onChange={handleSearchTitle} value={queryTitle} style={{ paddingLeft: '10px', fontSize: '36px' }} />
                            {autoDisplayTitle && (
                                <AutoContainer style={{ position: 'absolute', zIndex: 999, backgroundColor: 'rgba(54, 47, 75, 0.9)', textAlign: 'center' }}>
                                    {autoDisplayTitleRender.map((item, index) => {
                                        return (
                                            <AutoContent onClick={() => { handleAutoTitle(item.title) }}>
                                                <span style={{ color: '#ffffff', fontSize: '24px' }}>
                                                    {item.title}
                                                </span>
                                            </AutoContent>
                                        );
                                    })}
                                </AutoContainer>
                            )}
                        </InputContent>
                    </InputContainer>
                    <InputContainer>
                        <InputTitle>
                            <span style={{ fontSize: '28px' }}>Show Time</span>
                        </InputTitle>
                        <InputContent>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        style={{ width: '300px' }}
                                        disableToolbar
                                        variant='inline'
                                        format='MM/dd/yyyy'
                                        margin='normal'
                                        id='date-picker'
                                        onChange={setqueryShowTime}
                                        value={queryShowTime}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </InputContent>
                    </InputContainer>
                    <InputContainer>
                        <InputTitle>
                            <span style={{ fontSize: '28px' }}>Like</span>
                        </InputTitle>
                        <InputContent>
                            <LikeInput type="number" onChange={handleLike} style={{ paddingLeft: '10px', fontSize: '36px' }} />
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