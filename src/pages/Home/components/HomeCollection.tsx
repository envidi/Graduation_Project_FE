import { CollectionCard } from '../../../components/CollectionCard'
import { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader'
import { MovieType } from '@/Interface/movie'

export interface MoviePropsType {
  dataMovie: MovieType[]
  isLoading: boolean
}

export const HomeCollection = ({ dataMovie, isLoading }: MoviePropsType) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0); // Chỉ số của phim hiện đang được hiển thị

  useEffect(() => {
    const interval = setInterval(() => {
      // Kiểm tra nếu không có phim nào hoặc chỉ có một phim trong danh sách, không làm gì cả
      if (!dataMovie || dataMovie.length <= 1) return;

      // Tăng chỉ số của phim hiện tại lên 1, nếu đã ở phim cuối cùng, quay lại phim đầu tiên
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % dataMovie.length);
    }, 5000); // Thời gian chuyển đổi giữa các phim (đơn vị: ms), ở đây là 5 giây

    // Xóa interval khi component bị unmounted hoặc effect thay đổi
    return () => clearInterval(interval);
  }, [dataMovie]); // Chạy lại effect khi danh sách phim thay đổi

  const override = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  if (isLoading) {
    return <HashLoader cssOverride={override} color="#eb3656" />
  }

  return (
    <section className="section-home-collection" id="nowShowing">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection text-primary-locationMovie">
          Now Playing &rarr;
        </h1>
      </div>

      <div className="home-collection-container">
        {dataMovie && dataMovie.map((movie: MovieType, idx: number) => {
          // Kiểm tra xem phim này có phải là phim đang được hiển thị không, nếu có thì hiển thị, ngược lại ẩn đi
          const isVisible = idx === currentMovieIndex;
          return (
            <div key={idx} style={{ display: isVisible ? 'block' : 'none' }}>
              <CollectionCard className="" movie={movie} />
            </div>
          );
        })}
      </div>
    </section>
  )
}
