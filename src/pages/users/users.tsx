import React from 'react';
import TableUsers from "../../components/tables/tableUsers/TableUsers";
import TableAdmins from "../../components/tables/tableAdmins/TableAdmins";
import TableOperators from "../../components/tables/tableOperators/TableOperators";
import TableFileDeviceDB from "../../components/tables/tableFileDeviceDB/TableFileDeviceFromDB";

const Users = () => {
    return (
        <div>
            <h3> Пользователи </h3>
            <TableUsers/>
            <h3> Администраторы </h3>
            <TableAdmins/>
            <h3> Операторы </h3>
            <TableOperators/>
            <h3> Список файлов устройств ранее загруженных в Базу </h3>
            <TableFileDeviceDB/>
        </div>
    );
};

export default Users;