import PropTypes from 'prop-types';
import Column from './column';
import Pagination from '../../ui/pagination';

const Table = ({
    columns,
    data,
    total,
    loading = false,
}) => {

    return (
        <div className='w-full'>
            <table className="w-full datatable">
                <thead>
                    <tr>
                        {columns.map((column) => {
                            return <Column column={column} key={`column-${column.title}`} />
                        })}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length + 1}>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <span>Loading...</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                            data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1}>
                                        <div className='w-full flex items-center justify-center p-2'>
                                            <span>No data found</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                    data.map(row => {
                                        return (
                                            <tr key={`row-${row.id}`}>
                                                {columns.map((column) => {
                                                    return <td key={`row-${row.id}-${column.render(row)}`}>{column.render(row)}</td>
                                                })}
                                            </tr>
                                        )
                                    })
                                )
                    )}
                </tbody>
            </table>

            <div className='flex items-center justify-between mt-3'>
                <span>Showing {data.length} from {total}</span>
                <div>
                    <Pagination total={total} />
                </div>
            </div>
        </div>
    )
}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    total: PropTypes.number,
}

export default Table;