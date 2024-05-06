import PropTypes from 'prop-types';
import Pagination from '../../components/ui/pagination';
import Edit from './edit';
import Delete from './delete';

const Table = ({ users, total, loading }) => {
    return (
        <div>
            <table className="w-full datatable">
                <thead>
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
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
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="p-2">{user.username}</td>
                                <td className="p-2">
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td className="p-2 flex items-center gap-2">
                                    <Edit user={user} />
                                    <Delete user={user} />
                                </td>
                            </tr>
                        ))
                    )}

                </tbody>
            </table>

            <div className='mt-2 flex items-center justify-between'>
                <div>
                    <span>Showing {users.length} from {total}</span>
                </div>

                <Pagination
                    total={total}
                />
            </div>
        </div>
    );
}

Table.propTypes = {
    users: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    loading: PropTypes.bool,
}

export default Table;