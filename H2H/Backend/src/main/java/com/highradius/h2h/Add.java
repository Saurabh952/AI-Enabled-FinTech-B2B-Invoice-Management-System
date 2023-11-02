package com.highradius.h2h;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.sql.Date;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Add
 */
@WebServlet("/add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			response.addHeader("Access-Control-Allow-Origin", "*");
			Connection con = CP.createConnection();
			
			String q = "insert into winter_internship2(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			
//			String b1= "SET @autoid :=0;";
//			String b2 = "UPDATE winter_internship2 SET sl_no=@autoid := (@autoid+1);";
//			String b3 = "ALTER TABLE winter_internship2 AUTO_INCREMENT = 1;";
			//prepared Statement
			PreparedStatement pstmt = con.prepareStatement(q);
			String business_code = request.getParameter("business_code");
			String cust_number = request.getParameter("cust_number");
			String clear_date = request.getParameter("clear_date");
			String buisness_year = request.getParameter("buisness_year");
			String doc_id = request.getParameter("doc_id");
			String posting_date = request.getParameter("posting_date");
			String document_create_date = request.getParameter("document_create_date");
			String due_in_date = request.getParameter("due_in_date");
			String invoice_currency = request.getParameter("invoice_currency");
			String document_type = request.getParameter("document_type");
			String posting_id = request.getParameter("posting_id");
			String total_open_amount = request.getParameter("total_open_amount");
			String baseline_create_date = request.getParameter("baseline_create_date");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			String invoice_id = request.getParameter("invoice_id");
			
//			pstmt.addBatch(b1);
//		    pstmt.addBatch(b2);
//		    pstmt.addBatch(b3);
			
			//set values of parameters
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			
			pstmt.setString(1, business_code);
			pstmt.setInt(2, Integer.parseInt(cust_number));
			pstmt.setDate(3, new Date(formatter.parse(clear_date).getTime()));
			pstmt.setInt(4, Integer.parseInt(buisness_year));
			pstmt.setString(5, doc_id);
			pstmt.setDate(6, new Date(formatter.parse(posting_date).getTime()));
			pstmt.setDate(7, new Date(formatter.parse(document_create_date).getTime()));
			pstmt.setDate(8, new Date(formatter.parse(due_in_date).getTime()));
			pstmt.setString(9, invoice_currency);
			pstmt.setString(10, document_type);
			pstmt.setInt(11, Integer.parseInt(posting_id));
			pstmt.setDouble(12, Double.parseDouble(total_open_amount));
			pstmt.setDate(13, new Date(formatter.parse(baseline_create_date).getTime()));
			pstmt.setString(14, cust_payment_terms);
			pstmt.setInt(15, Integer.parseInt(invoice_id));
			
			//execute
//			pstmt.executeBatch();
			pstmt.executeUpdate();
			PrintWriter out = response.getWriter();
			out.println("Data Added Sucessfully");
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
