// Message model
module.exports = function (sequelize, DataTypes) {
    const Message = sequelize.define("Message", {
        senderID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiverID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiverEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        unread: {
            type: DataTypes.TINYINT,
            default: 1
        },
        seen:{
            type: DataTypes.TINYINT,
            default: 0
        },
        inView: {
            type: DataTypes.TINYINT,
            default: 0
        }
    });
    return Message;
};
