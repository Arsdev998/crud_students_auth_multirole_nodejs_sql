import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { getMe } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/dashboard/Welcome";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [navigate, isError]);

  return (
    <Layout>
     <Welcome/>
    </Layout>
  );
};

export default Dashboard;
