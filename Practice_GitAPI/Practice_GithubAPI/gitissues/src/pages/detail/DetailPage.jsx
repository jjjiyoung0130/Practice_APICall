import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchGitApiDetail } from 'store/issuesSlice';

const DetailPage = () => {
    const dispatch = useDispatch();
    const [params] = useSearchParams();

    const {
        issueDetail: issueDetailData,
        isLoading,
        error,
    } = useSelector(state => state.issues);

    const issueData = params.get('issueNumber');

    useEffect(() => {
        dispatch(
            fetchGitApiDetail({
                issueNumber: issueData,
            }),
        );
    }, [dispatch]);
    if (isLoading) {
        return <div>2조 조장 바보</div>;
    }
    if (error) {
        return <div>error</div>;
    }

    // const [issueDetailData, setIssueDetailData] = useState();

    // const fetchGitApiIssues = async () => {
    //     try {
    //         // setIsLoading(false);
    //         if (issueData) {
    //             const response = await GitApiIssuesDetail(issueData);
    //             setIssueDetailData(response.data);
    //         }
    //     } catch (error) {
    //         console.log('error', error);
    //         // setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchGitApiIssues();
    //     console.log(issueDetailData);
    // }, [issueData]);

    return (
        <>
            {issueDetailData && (
                <div>
                    <h1>{issueDetailData.title}</h1>

                    <ReactMarkdown>{issueDetailData.body}</ReactMarkdown>
                </div>
            )}
        </>
    );
};
export default DetailPage;
