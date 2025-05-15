import React from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Expenses.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Expenses = () => {
  const pieData = {
    labels: ["House", "Bills", "Food"],
    datasets: [
      {
        label: "Expenses (RM)",
        data: [1245.9, 89.0, 245.6],
        backgroundColor: ["orange", "pink", "yellow"],
        borderWidth: 5
      }
    ]
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Housing",
        data: [1200, 1250, 1245, 1300, 1245.9],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3
      },
      {
        label: "Food",
        data: [200, 220, 230, 240, 245.6],
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.3
      },
      {
        label: "Bills",
        data: [85, 87, 88, 89, 89.0],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Expenses - May 2025</h2>
        <Link to="/app/Record" className="btn btn-primary">See More</Link>
      </div>

      <div className="container-fluid">
        <Row>
          <Col md={6}>
            <div className="card mb-4">
              <div className="card-header">
                <h5>Expense Distribution</h5>
              </div>
              <div style={{ height: "300px", padding: "15px" }}>
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right"
                      }
                    }
                  }}
                />
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="card mb-4">
              <div className="card-header">
                <h5>Monthly Trends</h5>
              </div>
              <div style={{ height: "300px", padding: "15px" }}>
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                      mode: "index",
                      intersect: false
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        title: {
                          display: true,
                          text: "Amount (RM)"
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {pieData.labels.map((label, index) => (
            <Col md={4} key={index}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{label}</h5>
                  <p className="card-text">
                    RM{pieData.datasets[0].data[index].toFixed(2)}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Expenses;
