import Pagination from 'components/pagination';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchGitApi } from 'store/issuesSlice';
import styled from 'styled-components';

const MainPage = () => {
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(params.get('page'));
    const [perPage, setPerPage] = useState(10);

    const navigate = useNavigate();

    //https://github.com/angular/angular-cli/issues?page=2&q=is%3Aissue+is%3Aopen
    // state
    const {
        issueList: issuesData,
        isLoading,
        error,
    } = useSelector(state => state.issues);

    {
        /*
        page: number 가 바뀌면 데이터가 달라짐
        perPage: number가 바뀌면 데이터 갯수가 달라져야함

    */
    }

    useEffect(() => {
        dispatch(
            fetchGitApi({
                page: currentPage,
                perPage: perPage,
                sort: 'created',
                state: 'open',
            }),
        );
    }, [dispatch, currentPage, perPage]);

    if (isLoading) {
        return <div>2조 이영록 바보</div>;
    }

    if (error) {
        return <div>error</div>;
    }

    const onChangePage = page => {
        setCurrentPage(page);
        setParams({ page: page });
    };

    const handleIssuesDetail = issueNumber => {
        const query = `?issueNumber=${issueNumber}`;
        navigate(`/issues/${issueNumber}${query}`);
    };

    const handlePerPage = e => {
        const selectedPerPage = parseInt(e.target.value, 10);
        setPerPage(selectedPerPage);
        setParams({ ...params, page: 1 });
    };

    return (
        <>
            <Style.Wrapper>
                <Style.Select value={perPage} onChange={handlePerPage}>
                    <Style.Option value={10}>10</Style.Option>
                    <Style.Option value={20}>20</Style.Option>
                    <Style.Option value={50}>50</Style.Option>
                </Style.Select>
                {issuesData.map(issue => (
                    <Style.Container
                        key={issue.id}
                        onClick={() => handleIssuesDetail(issue.number)}
                    >
                        {/* 제목, 내용, 댓글수, 생성일,작성자,  */}
                        <Style.H1>{issue.title}</Style.H1>
                        <Style.P>{issue.user.login}</Style.P>
                        <Style.TextContainer>
                            <Style.B>
                                <ReactMarkdown>{issue.body}</ReactMarkdown>
                            </Style.B>
                        </Style.TextContainer>
                        <p>{issue.comments}</p>
                        <p>{issue.created_at}</p>
                    </Style.Container>
                ))}
                <Pagination
                    issuesData={issuesData}
                    perPage={perPage}
                    currentPage={currentPage}
                    onPageChange={onChangePage}
                />
            </Style.Wrapper>
        </>
    );
};
export default MainPage;
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Container = styled.div`
    width: 60%;
    height: 100%;
    margin: 20px 0;
    box-shadow: 2px 2px 2px 2px #ccc;
    border-radius: 16px;
    &:hover {
        cursor: pointer;
    }
`;

const H1 = styled.h1`
    font-size: 30px;
`;
const P = styled.p``;

const B = styled.b``;
const TextContainer = styled.div`
    width: 80%;
    height: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const Select = styled.select`
    width: 5%;
    padding: 10px auto;
    text-align: center;
    margin: 0 80px 10px auto;
    cursor: pointer;
`;
const Option = styled.option``;
const Style = {
    Wrapper,
    Container,
    H1,
    P,
    B,
    TextContainer,
    Select,
    Option,
};
