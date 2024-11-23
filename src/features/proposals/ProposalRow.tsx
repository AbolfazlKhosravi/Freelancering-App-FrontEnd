import { Proposal } from "../../services/projectSrvice";
import Table from "../../ui/Table";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "../../utils/toPersianNumbers";
import truncateText from "../../utils/truncateText";

const statusStyle = [
  {
    label: "رد شده",
    className: "badge--danger",
  },
  {
    label: "در انتظار تایید",
    className: "badge--secondary",
  },
  {
    label: "تایید شده",
    className: "badge--success",
  },
];
interface ProposalRow {
  index:number,
  proposal:Proposal
}
function ProposalRow({ proposal, index }:ProposalRow) {
  const { status, description, duration, price } = proposal;

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{truncateText(description||"", 60)}</td>
      <td> {toPersianNumbers(String(duration))} روز</td>
      <td>{toPersianNumbersWithComma(price)}</td>
      <td>
        <span className={`badge ${statusStyle[status].className}`}>
          {statusStyle[status].label}
        </span>
      </td>
    </Table.Row>
  );
}
export default ProposalRow;
