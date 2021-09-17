import './Spinner.css';

const Spinner = ({LoadState}) => {
    if(LoadState){
        return <div className="lds-dual-ring"></div>;
    }
    else{
        return null;
    }
}

export default Spinner;