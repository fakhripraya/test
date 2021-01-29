import styled from 'styled-components'

export const MasterTable = styled.table`
    position: relative;
    margin-top: 50px;
    width: 90%;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-spacing: 0px;
`

export const TableHeaderContainer = styled.thead`
    background-color: #362F4B;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const TableBodyContainer = styled.tbody`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const TableBody = styled.tr`
    height: 150px;
    justify-content: center;
    align-items: center;
    
    &:hover{
        background-color: #ddd;
    }
`

export const TableHeader = styled.tr`
    height: 100px;
    justify-content: center;
    align-items: center;
`

export const HeaderContent = styled.th`
    justify-content: center;
    align-items: center;

    &:last-child{
        border-top-right-radius: 50px;
    }
`

export const HeaderThumbnail = styled.th`
    border-top-left-radius: 50px;
    width: 10%;
    justify-content: center;
    align-items: center;
`

export const BodyThumbnail = styled.td`
    height: 200px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1.5px solid rgba(0,0,0,0.5);
`

export const BodyContent = styled.td`
    text-align: center; 
    justify-content: center;
    align-items: center;
    border-bottom: 1.5px solid rgba(0,0,0,0.5);
`

export const TableButton = styled.button`
    justify-content: center;
    border-radius: 50px;
    background: #362F4B;
    white-space: nowrap;
    padding: 20px 0px;
    color: #fff;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    width: 150px;
    
    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #362F4B;
    }
`

export const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`
export const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    justify-content: 'center';
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
`

export const ContentThumbnail = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const ContentData = styled.div`
margin-top: 10px;
margin-bottom: 10px;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const ContentButtonWrapper = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    align-self: center;
    text-align: center;
    margin-bottom: 20px;
`