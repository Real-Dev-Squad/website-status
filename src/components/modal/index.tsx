import classNames from './modal.module.scss';

const Modal = ({ showModal, click }) => {
  return (
    <>
      <div className={showModal ? classNames.backdropVisible : null}></div>
      <div
        className={showModal ? classNames.modalVisible : classNames.modal}
        id='add-modal'
      >
        <div className={classNames.modalContent}>
          <label htmlFor='title'>Challenge Title</label>
          <input type='text' name='title' id='title' />
          <label htmlFor='level'>Level</label>
          <select name='challenge-level' id='challenge-level'>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
          <label htmlFor='start-date'>Start Date</label>
          <input type='text' name='start-date' id='start-date' />
          <label htmlFor='end-date'>End Date</label>
          <input type='text' name='end-date' id='end-date' />
        </div>
        <div className={classNames.modalActions}>
          <button className={classNames.btnPassive} onClick={click}>
            Cancel
          </button>
          <button className={classNames.btnSuccess}>Add</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
