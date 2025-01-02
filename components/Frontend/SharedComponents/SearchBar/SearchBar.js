
import styles from './SearchBar.module.css';
import SearchBarLogic from './SearchBarLogic';

export default function SearchBar({pageStates: {tableOptions}, pageTasks: {tableTasks}}) {

    const {search, SpinnerState} = SearchBarLogic(tableTasks, tableOptions);

    return (
        <div className={`${styles.mainWrapper}`}> 
            <form className={`${styles.formElement} `} > 
                <div className={`${styles.formContentWrapper} `}>
                    <div className={`${styles.inputGroup} `} >
                        <div className={`${styles.searchBarLeft} `} >
                            <input name="searchQuery" type='text' placeholder='Search by ID, Name' className={`${styles.searchInput} form-control`} required/>
                        </div>
                        <div className={`${styles.searchBarRight} `} >
                            <button className={`c-btn-primary `} type="submit" onClick={search} >
                                <div>Search</div>
                                {(SpinnerState.isActive)&&
                                 <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}