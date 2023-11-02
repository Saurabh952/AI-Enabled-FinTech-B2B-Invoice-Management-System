package com.highradius.h2h;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Edit
 */
@WebServlet("/edit")
public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Edit() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String q=null;
		PreparedStatement pstmt=null;
		try {
			response.addHeader("Access-Control-Allow-Origin", "*");
			Connection con = CP.createConnection();
			
			String id=request.getParameter("id");
			String invoice=request.getParameter("invoice");
			String payterms=request.getParameter("payterms");
			String doc_id = request.getParameter("doc_id");
			String value=request.getParameter("value");
			
			if(doc_id!=null && value!=null) {
				q="update winter_internship2 set aging_bucket=? where doc_id=?";
				pstmt = con.prepareStatement(q);
				pstmt.setString(1,value);
				pstmt.setString(2,doc_id);
			}
			else {
				q="update winter_internship2 set invoice_currency=?,cust_payment_terms=? where sl_no=?";
				pstmt = con.prepareStatement(q);
				pstmt.setString(1,invoice);
				pstmt.setString(2,payterms);
				pstmt.setInt(3,Integer.parseInt(id));
			}
			
			pstmt.executeUpdate();
			
			PrintWriter out = response.getWriter();
			out.println("Data Updated Sucessfully");
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}

}
