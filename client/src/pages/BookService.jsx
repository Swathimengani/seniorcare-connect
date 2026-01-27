import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getServicesApi } from "../api/service.api";
import { getMyPatientsApi } from "../api/patient.api";
import { createBookingApi } from "../api/booking.api";

export default function BookService() {
  const [services, setServices] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    patientId: "",
    serviceId: "",
    scheduleDate: "",
    scheduleTime: "",
    durationPlan: "",
    address: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const s = await getServicesApi();
    const p = await getMyPatientsApi();
    setServices(s.data.services);
    setPatients(p.data.patients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createBookingApi(form);
      alert("Booking created successfully ✅");
      setForm({
        patientId: "",
        serviceId: "",
        scheduleDate: "",
        scheduleTime: "",
        durationPlan: "",
        address: "",
      });
    } catch (err) {
      alert(err?.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Book a Service</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-5 grid md:grid-cols-2 gap-4"
      >
        {/* Patient */}
        <select
          className="border p-2 rounded"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
          required
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.fullName}
            </option>
          ))}
        </select>

        {/* Service */}
        <select
          className="border p-2 rounded"
          value={form.serviceId}
          onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
          required
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} (₹{s.basePrice})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={form.scheduleDate}
          onChange={(e) =>
            setForm({ ...form, scheduleDate: e.target.value })
          }
          required
        />

        <input
          placeholder="Time (eg: 10:00 AM)"
          className="border p-2 rounded"
          value={form.scheduleTime}
          onChange={(e) =>
            setForm({ ...form, scheduleTime: e.target.value })
          }
          required
        />

        <input
          placeholder="Duration (eg: 2 Hours / Daily)"
          className="border p-2 rounded"
          value={form.durationPlan}
          onChange={(e) =>
            setForm({ ...form, durationPlan: e.target.value })
          }
          required
        />

        <input
          placeholder="Service Address"
          className="border p-2 rounded md:col-span-2"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          required
        />

        <button
          disabled={loading}
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </Layout>
  );
}
