import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Pagination } from '@material-ui/lab';

const PaginationTest = ({ eventsPerPage, totalEvents, paginate }) => {
    const pageNumbers = [];
    const [spacing, setSpacing] = React.useState(2);

    for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>

            <Grid container justify="center" spacing={spacing} >
                <div className='pagination' style={{ display: 'flex', marginTop: '40px', marginBottom: '40px' }} >

                    {pageNumbers.map(number => (
                        <Grid item >
                            <div key={number} className='page-item'>
                                <a onClick={() => paginate(number)} to='/home' className='page-link' style={{ cursor: 'pointer', margin: '20px', fontSize: '20px', color: '#eca1a6' }}>
                                    {number}
                                </a>
                            </div>
                        </Grid>
                    ))}

                </div>
            </Grid>


        </nav >
    );
};

export default PaginationTest;