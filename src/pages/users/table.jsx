import PropTypes from 'prop-types';
import Pagination from '../../components/ui/pagination';

const Table = ({ users, total }) => {
    return (
        <div>
            <table className="w-full datatable">
                <thead>
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">
                                <button className="mr-2">Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
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
    total: PropTypes.number.isRequired
}

export default Table;