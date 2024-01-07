// Role
import db from "../db/models";

async function getRolesByGroupId(groupId) {
    try {
        const data = await db.Group_User.findAll({
            where: { id: groupId },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }
        });
        return {
            message: 'Get all group user successfully',
            code: 0,
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        }
    }
}

export {
    getRolesByGroupId
}