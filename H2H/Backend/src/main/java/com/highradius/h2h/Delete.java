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
 * Servlet implementation class Delete
 */
@WebServlet("/delete")
public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Delete() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			response.addHeader("Access-Control-Allow-Origin", "*");
			Connection con = CP.createConnection();
			String sl_no=request.getParameter("sl_no");
			
			PreparedStatement pstmt = con.prepareStatement("update winter_internship2 set is_deleted=1 where sl_no=?");
			
			pstmt.setInt(1,Integer.parseInt(sl_no));
			
			pstmt.executeUpdate();
			
			PrintWriter out = response.getWriter();
			out.println("Data Deleted Sucessfully");
		}
		catch(Exception e) {
			
		}
		
	}

}
