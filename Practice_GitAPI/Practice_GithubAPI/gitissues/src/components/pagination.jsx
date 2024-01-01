//import { useState } from 'react';

import styled from 'styled-components';

const Pagination = ({ issuesData, perPage, currentPage, onPageChange }) => {
    // const totalPage = Math.ceil(issuesData.length / perPage);
    const total = issuesData.length;
    const maxIssueList = 200;
    const totalPage = maxIssueList / perPage;

    // 여기서 currentPage를 조정하는 방법?
    const handlePageChange = page => {
        onPageChange(page);
    };
    const onPrevBtn = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };
    const onFirstBtn = () => {
        onPageChange(1);
    };
    const onLastBtn = () => {
        onPageChange(totalPage);
    };
    const onNextBtn = () => {
        if (currentPage < totalPage) {
            handlePageChange(currentPage + 1);
        }
    };
    return (
        <>
            <div>
                <Style.Button onClick={onFirstBtn}>&laquo;</Style.Button>
                <Style.Button onClick={onPrevBtn}>&lsaquo;</Style.Button>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                    page => (
                        <Style.Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            style={{
                                backgroundColor:
                                    currentPage == page ? '#eee' : '#fff',
                            }}
                            className={{
                                backgroundColor:
                                    currentPage == page ? 'active' : '#000',
                            }}
                        >
                            {page}
                        </Style.Button>
                    ),
                )}
                <Style.Button onClick={onNextBtn}>&rsaquo;</Style.Button>
                <Style.Button onClick={onLastBtn}>&raquo;</Style.Button>
            </div>
        </>
    );
};
export default Pagination;

const Button = styled.button`
    &:hover {
        cursor: pointer;
        background-color: #d96a80;
    }
    background-color: #ddddff;
    border: none;
    border-radius: 30%;
    &.active {
        border: 1px solid #ccc;
    }
    margin-right: 4px;
`;
const Style = {
    Button,
};
