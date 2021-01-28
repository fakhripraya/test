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
            <table>
                <thead>
                    <tr>
                        <th style={{ display: 'none' }}> ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Like</th>
                        <th>Show Time</th>
                    </tr>
                </thead>
                <TableContent>
                    {tableContentData}
                </TableContent>
            </table>
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
                <tbody key={index}>
                    <tr>
                        <td style={{ display: 'none' }}>{item.id}</td>
                        <td><img alt="ga ke load" src={item.image} /></td>
                        <td>{item.title}</td>
                        <td>{item.like}</td>
                        <td>{new Date(item.showTime).toLocaleDateString()}</td>
                        <td><button onClick={() => { handleDetail(item) }}>Detail</button></td>
                    </tr>
                </tbody>
            )}
            <TableContentDetail>
                {contentDetail}
            </TableContentDetail>
        </React.Fragment>
    );

}

export default Table;
