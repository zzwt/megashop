import { useEffect, useState, useRef } from "react";
import baseUrl from "../../utils/baseUrl";
import cookies from "js-cookie";
import { catchErrors } from "../../utils/catchErrors";
import axios from "axios";
import { Header, Table, Checkbox } from "semantic-ui-react";
import formatDate from "../../utils/formatDate";

function AccountPermissions() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUers();
  }, []);

  const getUers = async () => {
    try {
      const url = `${baseUrl}/api/users`;
      const token = cookies.get("token");
      const payload = { headers: { Authorization: token } };
      const response = await axios.get(url, payload);
      setUsers(response.data);
    } catch (error) {
      catchErrors(error, window.alert);
    }
  };

  const renderUsers = () => {
    return users.map((user, index) => (
      <UserPermission key={index} user={user} />
    ));
  };

  return (
    <>
      <Header content="User Permissions" icon="settings"></Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderUsers()}</Table.Body>
      </Table>
    </>
  );
}

const UserPermission = ({ user }) => {
  const [admin, setAdmin] = useState(user.role === "admin" ? true : false);
  const firstRun = useRef(true);

  const { name, email, role, updatedAt, createdAt, _id } = user;

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    updatePermission();
  }, [admin]);

  const toggleRole = () => {
    setAdmin((preState) => !preState);
  };

  const updatePermission = async () => {
    try {
      const url = `${baseUrl}/api/users`;
      const token = cookies.get("token");
      const payload = { userId: _id, role: admin ? "admin" : "user" };
      const header = { headers: { Authorization: token } };
      await axios.put(url, payload, header);
    } catch (error) {
      catchErrors(error, window.alert);
    }
  };

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox toggle checked={admin} onChange={toggleRole} />
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{formatDate(createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(updatedAt)}</Table.Cell>
      <Table.Cell>{admin ? "admin" : "user"}</Table.Cell>
    </Table.Row>
  );
};

export default AccountPermissions;
