const ConfirmAlertDialogBox = ({ handleClickDelete, onClose }) => {
    return (
        <div className='custom-ui card-wrap text-center delete-popup'>
            <h4 className="mb-5">Are you sure you want to delete this record?</h4>
            <button style={{background: "linear-gradient(90deg, #0089E2 5%, #00C7E2 100%)"}} onClick={onClose} className="btn  me-2">No</button>
            <button className="btn btn-danger"
                onClick={() => {
                    handleClickDelete()
                    onClose();
                }}
            >
                Yes
            </button>
        </div>
    );
};


export default ConfirmAlertDialogBox