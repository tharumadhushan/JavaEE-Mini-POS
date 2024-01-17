package com.example.mini_pos.api;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet(name = "order",urlPatterns = "/order",
        initParams = {
                @WebInitParam(name = "db-user",value = "root"),
                @WebInitParam(name = "db-pw",value = "1234"),
                @WebInitParam(name = "db-url",value = "jdbc:mysql://localhost:3306/javaee?createDatabaseIfNotExist=true"),
                @WebInitParam(name = "db-class",value = "com.mysql.cj.jdbc.Driver"),

        }
)
public class Order extends HttpServlet {
    Connection connection;
    final static Logger logger = LoggerFactory.getLogger(Order.class);

    @Override
    public void init() throws ServletException {
        try {
            InitialContext ctx = new InitialContext();
            DataSource pool = (DataSource) ctx.lookup("java:comp/env/jdbc/pos");
            System.out.println(pool);
            this.connection = pool.getConnection();

        } catch (NamingException | SQLException e) {
            e.printStackTrace();
        }
    }
}
