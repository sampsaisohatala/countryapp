import ClipLoader from 'react-spinners/ClipLoader';
import './LoadingScreen.css';

function LoadingScreen(props) {
   return (
      <div className={props.loading ? 'loading' : 'loading fade'}>
         <div className="sweet-loading">
            <ClipLoader size={150} color={'#000000'} />
         </div>
      </div>
   );
}

export default LoadingScreen;
