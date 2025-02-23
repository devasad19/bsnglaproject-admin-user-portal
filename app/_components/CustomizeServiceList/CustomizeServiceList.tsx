"use client";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React, { act, useEffect, useState } from "react";
import CustomizeServiceTableList from "./CustomizeServiceTableList";
import {
  getAllPublishActiveServices,
  updatePublishActiveServices,
} from "@/app/(admin)/_api/activeServicesApi";
import { useSearchParams } from "next/navigation";

const CustomizeServiceList = () => {
  const page = useSearchParams().get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const [services, setServices] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPage, setShowPage] = useState(1);
  // const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // console.log({active, over});

    const oldIndex = services.findIndex((s: any) => s.id === active.id);
    const newIndex = services.findIndex((s: any) => s.id === over.id);
    const newArray = arrayMove(services, oldIndex, newIndex);

    setServices(newArray);
    updateOrder(newArray);
  };

  const updateOrder = async (newRows: any) => {
    // console.log({newRows})

    const positionData = newRows.map((row: any) => row.id);
    // console.log({ positionData });
    try {
      const res = await updatePublishActiveServices(positionData);
      console.log("update order response:", res);
      if(res?.status){
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const fetchActiveServices = async () => {
    try {
      setLoading(true);
      const params={
        page: currentPage,
        limit
      }
      const res = await getAllPublishActiveServices(params);
      console.log({ res });
      setCurrentPage(res?.meta?.page);
      setShowPage(res?.meta?.total_page);

     
      setServices(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch active services:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveServices();
  }, [refresh, currentPage, limit]);

  // console.log({ services });
  

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <section>
        <div className="flex flex-wrap justify-between pb-1">
          <h3 className="text-32 font-mono font-bold text-[#151D48]">
            Customized Services List
          </h3>
          <div>
            <select
              className="border border-gray-300 rounded-md px-2 py-1"
              name="limit"
              id="limit"
              value={limit}
              onChange={(e) => {
                setCurrentPage(1);
                setShowPage(1);
                setLimit(parseInt(e.target.value));
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <CustomizeServiceTableList
         services={services}
          loading={loading}
          page={currentPage}
          limit={limit}
          showPage={showPage}
          setPage={setCurrentPage}
           />
      </section>
    </DndContext>
  );
};

export default CustomizeServiceList;
