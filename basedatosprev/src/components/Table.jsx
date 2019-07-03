import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "../assets/tableStyle";

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor, isCache } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            if (!isCache)
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {prop._id}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.token}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.data.title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.data.body}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.android.link}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.webpush.link}
                  </TableCell>
                </TableRow>
              );
            else
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {prop.key}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop.data}
                  </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(tableStyle)(CustomTable);
