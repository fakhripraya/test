import styled from 'styled-components'

export const MasterContainer = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const Title = styled.div`
    font-size: 72px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 100px;
    margin-bottom: 100px;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: 'row';
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`

export const InputContainer = styled.div`
`

export const InputTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
`

export const InputContent = styled.div`
    margin-top: 10px;
`

export const SearchInput = styled.input`
    outline: none;
    height: 50px;
    width: 300px;
    border-radius: 10px;
`

export const LikeInput = styled.input`
    outline: none;
    height: 50px;
    width: 300px;
    border-radius: 10px;
`

export const AutoContainer = styled.div`
    border-radius: 10px;
    margin-top: 5px;
    justify-content: center;
    align-items: center;
`

export const AutoContent = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: center;
    align-items: center;
    background-color: '#333333';

    &:hover{
        background: rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }
`