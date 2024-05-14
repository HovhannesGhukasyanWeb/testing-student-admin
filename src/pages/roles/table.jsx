import PropTypes from 'prop-types';
import Pagination from '../../components/ui/pagination';
import Edit from './edit';
import Delete from './delete';

const Table = ({ roles, total, loading }) => {
    return (
        <div>
            <table className="w-full datatable">
                <thead>
                    <tr>
                        <th className="p-2">Id</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {loading ? (
                        <tr>
                            <td colSpan={3} className='text-center'>
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        roles.map((role) => (
                            <tr key={role.id}>
                                <td className='p-2'>{role.id}</td>
                                <td className='p-2'>{role.name}</td>
                                <td className='p-2 flex items-center gap-2'>
                                    <Edit role={role} />
                                    <Delete role={role} />
                                </td>
                            </tr>
                        ))
                    )}

                </tbody>
            </table>

            <div className='mt-2 flex items-center justify-between'>
                <div>
                    <span>Showing {roles.length} from {total}</span>
                </div>

                <Pagination
                    total={total}
                />
            </div>
        </div>
    );
}

Table.propTypes = {
    roles: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    loading: PropTypes.bool,
}

export default Table;