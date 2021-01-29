import {
    TableBody,
    MasterTable,
    BodyContent,
    TableHeader,
    TableButton,
    HeaderContent,
    BodyThumbnail,
    HeaderThumbnail,
    TableBodyContainer,
    TableHeaderContainer,
} from './style/table-style';
import Modal from './Modal';
import React, { useState } from 'react';

const Table = (children) => {

    const tableContentData = {
        data: children.children.data,
        queryTitle: children.children.title,
        queryLike: children.children.like,
        queryLikeToggle: children.children.likeToggle,
        queryShowTime: children.children.showTime,
    }

    return (
        <React.Fragment>
            <MasterTable style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <TableHeaderContainer>
                    <TableHeader>
                        <HeaderContent style={{ display: 'none' }}> ID</HeaderContent>
                        <HeaderThumbnail><span style={{ color: 'white', fontSize: 28 }}>Image</span></HeaderThumbnail>
                        <HeaderContent><span style={{ color: 'white', fontSize: 28 }}>Title</span></HeaderContent>
                        <HeaderContent><span style={{ color: 'white', fontSize: 28 }}>Like</span></HeaderContent>
                        <HeaderContent><span style={{ color: 'white', fontSize: 28 }}>Show Time</span></HeaderContent>
                        <HeaderContent><span style={{ color: 'white', fontSize: 28 }}>Action</span></HeaderContent>
                    </TableHeader>
                </TableHeaderContainer>
                <TableContent>
                    {tableContentData}
                </TableContent>
            </MasterTable>
        </React.Fragment>
    )

}

const TableContent = (children) => {

    const [modalToggle, setModalToggle] = useState(false)
    const [contentDetail, setContentDetail] = useState([])

    let renders = children.children.data
    let queryTitle = children.children.queryTitle
    let queryLike = children.children.queryLike
    let queryLikeToggle = children.children.queryLikeToggle
    let queryShowTime = children.children.queryShowTime

    // console.log("data")
    // console.log(renders)
    // console.log(children.children.queryTitle)
    // console.log(children.children.queryLike)
    // console.log(children.children.queryLikeToggle)
    console.log(children.children.queryShowTime)
    console.log(new Date(queryShowTime).toLocaleDateString())

    if (queryTitle !== null && queryTitle !== "") {
        let slices = []

        renders.forEach((item, index) => {

            // case sensitive
            if (item.title.includes(queryTitle)) {
                let tempSlices = [...slices, item]
                slices = tempSlices
            }

        })

        renders = slices

    }

    // console.log("filters")
    // console.log(renders)

    if (queryLike !== null) {
        let slices = []

        renders.forEach((item, index) => {

            // query like toggle adalah fungsi untuk tentukan tipe filter mana yang dipakai kolom "like"
            // 0 kurang dari
            // 1 sama dengan
            // 2 lebih dari

            if (queryLikeToggle === 0) {
                if (item.like < queryLike) {
                    let tempSlices = [...slices, item]
                    slices = tempSlices
                }
            } else if (queryLikeToggle === 1) {
                if (item.like === queryLike) {
                    let tempSlices = [...slices, item]
                    slices = tempSlices
                }
            }
            else if (queryLikeToggle === 2) {
                if (item.like > queryLike) {
                    let tempSlices = [...slices, item]
                    slices = tempSlices
                }
            }

        })

        renders = slices

    }

    if (queryShowTime !== null && queryShowTime !== "") {

        let slices = []
        let tempQueryShowTime = new Date(queryShowTime).toLocaleDateString();

        renders.forEach((item, index) => {

            let tempShowtime = new Date(item.showTime).toLocaleDateString();

            if (tempShowtime === tempQueryShowTime) {
                let tempSlices = [...slices, item]
                slices = tempSlices
            }

        })

        renders = slices

    }

    // console.log("Movie data render")
    // console.log(renders)

    function handleDetail(item) {
        console.log(item)
        setContentDetail(item)
        if (modalToggle === false)
            setModalToggle(true)
        else
            setModalToggle(false)
    }

    const TableContentDetail = (children) => {

        return (
            <Modal>
                {{ flag: modalToggle }}
                <div>
                    <div>
                        <img alt="ga ke load" src={children.children.image} />
                    </div>
                    <div>
                        <div>
                            <label>Title</label>
                            <label> {children.children.title}</label>
                        </div>
                        <div>
                            <label>Like</label>
                            {children.children.like}
                        </div>
                        <div>
                            <label>Show Time</label>
                            {new Date(children.children.showTime).toLocaleDateString()}
                        </div>
                    </div>
                    <div>
                        <button onClick={() => { handleDetail([]) }}>back</button>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <React.Fragment>
            {renders.map((item, index) =>
                <TableBodyContainer key={index}>
                    <TableBody>
                        <BodyContent style={{ display: 'none' }}>{item.id}</BodyContent>
                        <BodyThumbnail><img style={{ borderRadius: '50%', backgroundSize: 'cover', height: '75%', width: '50%' }} alt="ga ke load" src={item.image} /></BodyThumbnail>
                        <BodyContent><span style={{ fontSize: 22 }}>{item.title}</span></BodyContent>
                        <BodyContent><span style={{ fontSize: 22 }}>{item.like}</span></BodyContent>
                        <BodyContent><span style={{ fontSize: 22 }}>{new Date(item.showTime).toLocaleDateString()}</span></BodyContent>
                        <BodyContent><TableButton onClick={() => { handleDetail(item) }}><span>Detail</span></TableButton></BodyContent>
                    </TableBody>
                </TableBodyContainer>
            )}
            <TableContentDetail>
                {contentDetail}
            </TableContentDetail>
        </React.Fragment>
    );

}

export default Table;
