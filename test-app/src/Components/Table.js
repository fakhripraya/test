import {
    TableBody,
    MasterTable,
    BodyContent,
    TableHeader,
    TableButton,
    ContentData,
    HeaderContent,
    BodyThumbnail,
    ModalContainer,
    ContentWrapper,
    HeaderThumbnail,
    ContentThumbnail,
    ContentContainer,
    TableBodyContainer,
    TableHeaderContainer,
    ContentButtonWrapper,
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

    if (queryTitle !== null && queryTitle !== "") {
        let slices = []

        renders.forEach((item, index) => {

            // case sensitive
            if (item.title.toUpperCase().includes(queryTitle.toUpperCase())) {
                let tempSlices = [...slices, item]
                slices = tempSlices
            }

        })

        renders = slices

    }

    if (queryLike !== null) {
        let slices = []

        renders.forEach((item, index) => {

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
            else if (queryLikeToggle === 3) {
                if ((item.like.toString().toUpperCase().includes(queryLike.toString().toUpperCase()))) {
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

    function handleDetail(item) {

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
                <ModalContainer>
                    <ContentWrapper>
                        <ContentThumbnail>
                            <img style={{ borderRadius: '50%', backgroundSize: 'cover', height: '75%', width: '75%' }} alt="ga ke load" src={children.children.image} />
                        </ContentThumbnail>
                        <ContentContainer>
                            <ContentData>
                                <label style={{ fontSize: 22, fontWeight: 'bold' }}>Title : </label>
                                <label style={{ fontSize: 22 }}> {children.children.title}</label>
                            </ContentData>
                            <ContentData>
                                <label style={{ fontSize: 22, fontWeight: 'bold' }}>Like : </label>
                                <label style={{ fontSize: 22 }}> {children.children.like}</label>
                            </ContentData>
                            <ContentData>
                                <label style={{ fontSize: 22, fontWeight: 'bold' }}>Show Time : </label>
                                <label style={{ fontSize: 22 }}>{new Date(children.children.showTime).toLocaleDateString()}</label>
                            </ContentData>
                        </ContentContainer>
                    </ContentWrapper>
                    <ContentButtonWrapper>
                        <TableButton onClick={() => { handleDetail([]) }}>back</TableButton>
                    </ContentButtonWrapper>
                </ModalContainer>
            </Modal>
        );
    }

    return (
        <React.Fragment>
            {renders.map((item, index) =>
                <TableBodyContainer key={index} onClick={() => { handleDetail(item) }}>
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
