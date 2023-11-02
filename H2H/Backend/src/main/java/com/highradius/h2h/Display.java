package com.highradius.h2h;

import java.io.IOException;
import com.google.gson.Gson;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Display
 */
@WebServlet("/display")
public class Display extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Display() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Invoice> invoiceArray =new ArrayList<Invoice>();
		HashMap<Object,Object> Response = new HashMap<Object,Object>();
		PrintWriter out = response.getWriter();
		Connection con;
		ResultSet set = null;
		ResultSet set2 = null;
		try {
			response.addHeader("Access-Control-Allow-Origin", "*");
			
			String page = request.getParameter("page");
			String limit = request.getParameter("limit");
			String order = request.getParameter("order");
			String sort = request.getParameter("sort");
			String id = request.getParameter("id");
			String doc = request.getParameter("doc");
			String invoice = request.getParameter("invoice");
			String byear = request.getParameter("byear");
			String base = request.getParameter("base");
			String to_base = request.getParameter("to_base");
			String clear = request.getParameter("clear");
			String to_clear = request.getParameter("to_clear");
			
			String due=request.getParameter("due");
			String to_due=request.getParameter("to_due");
			
			con = CP.createConnection();
			
			//prepared Statement
			Statement stmt = con.createStatement();
			if(page==null) {
				if(clear!=null && due!=null && base!=null) {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and clear_date between '"+clear+"'"+" and "+"'"+to_clear+"'"+" AND due_in_date between '"+due+"'"+" and "+"'"+to_due+"'"+" AND baseline_create_date between '"+base+"'"+" and "+"'"+to_base+"'");
				}
				else if(clear!=null && due!=null) {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and clear_date between '"+clear+"'"+" and "+"'"+to_clear+"'"+" AND due_in_date between '"+due+"'"+" and "+"'"+to_due+"'");
				}
				else if(due!=null && base!=null) {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and due_in_date between '"+due+"'"+" and "+"'"+to_due+"'"+" AND baseline_create_date between '"+base+"'"+" and "+"'"+to_base+"'");
				}
				else if(clear!=null && base!=null) {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and clear_date between '"+clear+"'"+" and "+"'"+to_clear+"'"+" AND baseline_create_date between '"+base+"'"+" and "+"'"+to_base+"'");
				}
				else if(due!=null) {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and due_in_date between '"+due+"'"+" and "+"'"+to_due+"'");
				}
				else if(base!=null) {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and baseline_create_date between '"+base+"'"+" and "+"'"+to_base+"'");
				}
				else if(clear!=null) {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and clear_date between '"+clear+"'"+" and "+"'"+to_clear+"'");
				}
				else if(id==null) {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0");
				}
			}
			else {
				int si=Integer.parseInt(page)*Integer.parseInt(limit)-Integer.parseInt(limit);
				if(id!="" && doc!="" && invoice!="" && byear!="" && sort!="") {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and cust_number ="+id+" AND doc_id="+doc+" AND invoice_id="+invoice+" AND buisness_year="+byear+" order by "+sort+" "+order+" limit "+si+","+limit);
				}
				else if(id!="" && doc!="" && invoice!="" && byear!="") {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and cust_number ="+id+" AND doc_id="+doc+" AND invoice_id="+invoice+" AND buisness_year="+byear+" limit "+si+","+limit);
				}
				else if(id!="" && sort!="") {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and cust_number ="+id+" order by "+sort+" "+order+" limit "+si+","+limit);
				}
				else if(id!="") {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 and cust_number ="+id+" limit "+si+","+limit);
				}
				else if(id=="" && sort!="") {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 order by "+sort+" "+order+" limit "+si+","+limit);
				}
				else if(id=="") {
					set = stmt.executeQuery("select * from winter_internship2 where is_deleted=0 limit "+si+","+limit);
				}
			}
			
			
			while(set.next()) {
				Invoice i= new Invoice();
				int sn = set.getInt(1);
				String business_code = set.getString(2);
				int cust_number = set.getInt(3);
				String clear_date = set.getString(4);
				int business_year = set.getInt(5);
				String doc_id = set.getString(6);
				String posting_date = set.getString(7);
				String document_create_date = set.getString(8);
				String document_create_date1 = set.getString(9);
				String due_in_date = set.getString(10);
				String invoice_currency = set.getString(11);
				String document_type = set.getString(12);
				int posting_id = set.getInt(13);
				String area_business = set.getString(14);
				double total_open_amount = set.getDouble(15);
				String baseline_create_date = set.getString(16);
				String cust_payment_terms = set.getString(17);
				int invoice_id = set.getInt(18);
				int isOpen = set.getInt(19);
				String name_customer = set.getString(22);
				String business_name = set.getString(23);
				String aging_bucket = set.getString("aging_bucket");
				
				i.setId(sn);
				i.setBusiness_code(business_code);
				i.setCust_number(cust_number);
				i.setClear_date(clear_date);
				i.setBusiness_year(business_year);
				i.setDoc_id(doc_id);
				i.setPosting_date(posting_date);
				i.setDocument_create_date(document_create_date);
				i.setDocument_create_date1(document_create_date1);
				i.setDue_in_date(due_in_date);
				i.setInvoice_currency(invoice_currency);
				i.setDocument_type(document_type);
				i.setPosting_id(posting_id);
				i.setArea_business(area_business);
				i.setTotal_open_amount(total_open_amount);
				i.setBaseline_create_date(baseline_create_date);
				i.setCust_payment_terms(cust_payment_terms);
				i.setInvoice_id(invoice_id);
				i.setIsOpen(isOpen);
				i.setName_customer(name_customer);
				i.setBusiness_name(business_name);
				i.setAging_bucket(aging_bucket);
				
				invoiceArray.add(i);
			}
			
			Response.put("data", invoiceArray);
			
			if(id!="" && doc!="" && invoice!="" && byear!="") {
				set2 = stmt.executeQuery("select count(*) d_count from winter_internship2 where is_deleted=0 and cust_number ="+id+" AND doc_id="+doc+" AND invoice_id="+invoice+" AND buisness_year="+byear);
			}
			else if(id!="") {
				set2 = stmt.executeQuery("select count(*) d_count from winter_internship2 where is_deleted=0 and cust_number ="+id);
			}
			else if(id=="") {
				set2 = stmt.executeQuery("select count(*) d_count from winter_internship2 where is_deleted=0");
			}
			
			while(set2.next()) {
				int count = set2.getInt("d_count");
				Response.put("count", count);
			}
			
			Gson gson = new Gson();
			String data = gson.toJson(Response);
			out.print(data);
		}
		catch (Exception e) {
	        e.printStackTrace();
	    }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
