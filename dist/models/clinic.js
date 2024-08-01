"use strict";
// // src/models/clinic.ts
// import { DataTypes, Model } from 'sequelize';
// import sequelize from '../config/database';
// class Clinic extends Model {
//   public id!: number;
//   public name!: string;
//   public address!: string;
//   public phoneNumber!: string;
//   public email!: string;
//   public createdAt!: Date;
//   public updatedAt!: Date;
// }
// Clinic.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     phoneNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     tableName: 'clinics',
//   }
// );
// export default Clinic;
