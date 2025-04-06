import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Get the ID from the URL

    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Static mock comments for demonstration
    const mockComments = [
        {
            user: 'John Doe',
            date: '01 Jan 2045 at 12:00pm',
            content: 'This is a very informative post. Thank you for sharing!'
        },
        {
            user: 'Jane Smith',
            date: '02 Jan 2045 at 1:30pm',
            content: 'I love the tips provided here, especially the ones about taking care of pets.'
        },
        {
            user: 'Mark Lee',
            date: '02 Jan 2045 at 2:15pm',
            content: 'Great article! I think more people should read about this.'
        },
    ];

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/baiviet/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (err) {
                setError('Lỗi khi tải bài viết.');
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) {
        return <p>Đang tải bài viết...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!post) {
        return <p>Bài viết không tồn tại.</p>;
    }

    return (
        <div className="col-lg-8">
            <div className="d-flex flex-column text-left mb-4">
                <h4 className="text-secondary mb-3">Blog Detail</h4>
                <h1 className="mb-3">{post.tieu_de}</h1>
                <div className="d-flex mb-2">
                    <span className="mr-3">
                        <i className="fa fa-user text-muted" /> {post.nguoi_dung_id || 'Admin'}
                    </span>
                    <span className="mr-3">
                        <i className="fa fa-folder text-muted" /> {post.category || 'General'}
                    </span>
                    <span className="mr-3">
                        <i className="fa fa-comments text-muted" /> {mockComments.length || 0} Bình luận
                    </span>
                </div>
            </div>

            <div className="mb-5">
                {post.hinh_anh && (
                    <img className="img-fluid w-100 mb-4" src={`http://localhost:5000/img/${post.hinh_anh}`} alt={post.tieu_de} />
                )}
                {/* Căn đều 2 bên nội dung */}
                <p style={{
                    textAlign: 'justify',   // Căn đều văn bản
                    lineHeight: '1.6',      // Khoảng cách giữa các dòng
                    margin: '0 auto',       // Căn giữa phần tử
                    maxWidth: '800px',      // Giới hạn chiều rộng tối đa cho bài viết
                    padding: '0 15px'       // Thêm padding để tạo không gian bên trái và bên phải
                }}>
                    {post.noi_dung}
                </p>
            </div>


            {/* Comments Section */}
            <div className="mb-5">
                <h3 className="mb-4">Bình luận</h3>

                {/* Display Static Mock Comments */}
                {mockComments.map((comment, index) => (
                    <div key={index} className="media mb-3">
                        <img src="img/user.jpg" alt="User" className="img-fluid mr-3 mt-1" style={{ width: 45 }} />
                        <div className="media-body">
                            <h5>{comment.user}</h5>
                            <small><i>{comment.date}</i></small>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}

                {/* Add New Comment Form */}
                <h3 className="mb-4">Thêm bình luận</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="message">Bình luận *</label>
                        <textarea id="message" cols={30} rows={5} className="form-control" />
                    </div>
                    <div className="form-group mb-0">
                        <input type="submit" value="Gửi bình luận" className="btn btn-primary px-3" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogDetail;
