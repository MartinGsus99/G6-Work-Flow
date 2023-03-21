/*
 * @Author: Aruver ruiweilai@163.com
 * @Date: 2022-06-15 09:54:37
 * @LastEditors: Aruver ruiweilai@163.com
 * @LastEditTime: 2022-06-16 16:01:04
 * @FilePath: \scanpower_web\src\components\FormEntry\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import string from './string';
import number from './number';
import select from './select';
import date from './date';
import dateRange from './dateRange';
import checkbox from './checkbox';
import uploadFile from './uploadFile';
import cascader from './cascader';
import stringRange from './stringRange';
import uploadImg from './uploadImg';
import password from './password'
import selectMultip from  './selectMultiple'
import radio from './radio'
import cascaderMu from './cascaderMu'
import cron from './cron'

export default [
  string,
  number,
  select,
  date,
  dateRange,
  checkbox,
  uploadFile,  // 文件上传
  cascader,
  stringRange,
  uploadImg,    //图片上传
  password,     //密码框
  selectMultip, //多选
  radio,
  cascaderMu,
  cron
];
