"use client"
import MyComponent from "@/components/NewComponent";
import { NumberSchema, TNumberSchema } from "@/lib/zodTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, } } = useForm<TNumberSchema>({
    resolver: zodResolver(NumberSchema),
  });
  const [dataInHtml, setDataInHtml] = useState<Element | null>();
  const onSubmit = async (data: TNumberSchema) => {
    try {
      const res = await fetch('/api/number', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      const resData = await res.json();
      const escRemoved = resData.data.replace(/\\(.)/g, '');
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(escRemoved, 'text/html');
      setDataInHtml(htmlDoc.getElementsByClassName('custom-table')[0]);
    } catch (error) {
      console.log(error);
      alert("Something Bad Happened!");
    }
  }
  return (
    <>
      <main className='container mx-auto py-10 w-full h-full'>
        <h2 className="text-white underline text-3xl">Get Data From Number</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Number" {...register("number", { required: true, minLength: 10, maxLength: 10 })} />
            <button type="submit" className="bg-blue-400 text-white p-2 m-1">Submit</button>
          </div>
          {errors.number && <p className="text-red-400">{errors.number.message}</p>}
        </form>
        <div id="data-div">
          <MyComponent htmlDoc={dataInHtml} />
        </div>
      </main>
    </>
  )
}
