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

    return (
        <React.Fragment>
            {renders.map((item, index) =>
                <tbody>
                    <tr>
                        <td style={{ display: 'none' }}>{item.id}</td>
                        <td><img alt="ga ke load" src={item.image} /></td>
                        <td>{item.title}</td>
                        <td>{item.like}</td>
                        <td>{new Date(item.showTime).toLocaleDateString()}</td>
                        <td><button>Detail</button></td>
                    </tr>
                </tbody>
            )}
        </React.Fragment>
    );

}



export default Table;
