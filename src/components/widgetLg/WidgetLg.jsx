import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Transacciones</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Cliente</th>
          <th className="widgetLgTh">Fecha</th>
          <th className="widgetLgTh">Monto</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="http://127.0.0.1:8000/uploads/default.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Hermes Sanchez</span>
          </td>
          <td className="widgetLgDate">2 Enero 2021</td>
          <td className="widgetLgAmount">$16</td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="http://127.0.0.1:8000/uploads/default.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Hermes Sanchez</span>
          </td>
          <td className="widgetLgDate">1 Enero 2021</td>
          <td className="widgetLgAmount">$122.00</td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="http://127.0.0.1:8000/uploads/default.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Hermes Sanchez</span>
          </td>
          <td className="widgetLgDate">1 Enero 2021</td>
          <td className="widgetLgAmount">$80.00</td>
        </tr>
      </table>
    </div>
  );
}
