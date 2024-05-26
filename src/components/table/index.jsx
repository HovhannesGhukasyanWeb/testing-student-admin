import PropTypes from 'prop-types';
import Column from './column';
import Pagination from '../../ui/pagination';
import { localIsCouple } from '../../helpers/isCouple';

const Table = ({
    columns,
    data,
    total,
    loading = false,
    perPage = 10
}) => {

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className='bg-white border-b'>
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
                                        data.map((row, index) => {
                                            return (
                                                <tr className={localIsCouple(index) ? 'bg-gray-100 border-b' : 'bg-white border-b'} key={`row-${row.id}`}>
                                                    {columns.map((column) => {
                                                        return <td className='text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap' key={`row-${row.id}-${column.render(row)}`}>{column.render(row)}</td>
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
                                <Pagination total={total} perPage={perPage} />
                            </div>
                        </div>
                    </div>
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
    perPage: PropTypes.number,
}

export default Table;