import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // ✅ include reset
  const [loading, setLoading] = useState(false);
  

  async function onSubmit(data) {
    setLoading(true);

    try {
      // upload image
      const formData = new FormData();

      // save school
      const res = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data}),
      });

      if (res.ok) {
        alert("School added!");
        reset(); // ✅ clear all inputs
      } else {
        const { error } = await res.json();
        alert("Error adding school: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative">
        <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add School</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

            <input placeholder="Name" {...register("name", { required: true })} className="w-full p-2 border"/>
            {errors.name && <p className="text-red-500 text-sm">Name required</p>}

            <input placeholder="Address" {...register("address", { required: true })} className="w-full p-2 border"/>
            {errors.address && <p className="text-red-500 text-sm">Address required</p>}
            <input placeholder="City" {...register("city", { required: true })} className="w-full p-2 border"/>
            {errors.city && <p className="text-red-500 text-sm">City required</p>}
            <input placeholder="State" {...register("state", { required: true })} className="w-full p-2 border"/>
            {errors.state && <p className="text-red-500 text-sm">State required</p>}
            <input placeholder="Contact" {...register("contact", { required: true, pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" } } )} className="w-full p-2 border"/>
            {errors.contact && <p className="text-red-500 text-sm">Contact required</p>}
            <input placeholder="Email" {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} className="w-full p-2 border"/>
            {errors.email_id && <p className="text-red-500 text-sm">Valid email required</p>}

            <input placeholder="Image URL" {...register("image", { required: true })} className="w-full p-2 border"/>
            {errors.image && <p className="text-red-500">Image URL required</p>}
            <div className="flex w-full items-center justify-center">
              <button disabled={loading} className="bg-blue-500 text-white px-4 py-1 rounded w-1/4 mt-3">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
        </form>
        </div>

        <Link href="/" className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded">Back</Link>
    </div>
  );
}
