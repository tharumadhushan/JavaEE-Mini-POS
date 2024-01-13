package com.example.mini_pos.db;

import com.example.mini_pos.dto.CustomerDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CustomerDBProcess {
    private static final String SAVE_DATA = "INSERT INTO customer (customer_id, name, address, contact) VALUES (?, ?, ?, ?)";
    private static final String UPDATE_DATA = "UPDATE customer SET name=?, address=?, contact=? WHERE customer_id=?";
    private static final String DELETE_DATA = "DELETE FROM customer WHERE customer_id = ?";
    private static final Logger logger = LoggerFactory.getLogger(CustomerDBProcess.class);

    public void saveCustomer(CustomerDTO customer, Connection connection) {
//        String customer_id = "IT" + UUID.randomUUID();
        System.out.println("hello");
        try {
            System.out.println("hello1");
            System.out.println(connection);
            PreparedStatement ps = connection.prepareStatement(SAVE_DATA);

            ps.setString(1, customer.getCustomer_id());
            ps.setString(2, customer.getName());
            ps.setString(3, customer.getAddress());
            ps.setString(4, customer.getContact());
            int rowsAffected = ps.executeUpdate();
            if (rowsAffected != 0) {
//                logger.info(() -> "Data Saved");
                System.out.println("Data saved");
            } else {
//                logger.error(() -> "Failed to save");
                System.out.println("Failed to save");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error saving customer data", e);
        }
    }
    public void updateCustomer(CustomerDTO customer, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(UPDATE_DATA);

            ps.setString(1, customer.getName());
            ps.setString(2, customer.getAddress());
            ps.setString(3, customer.getContact());
            ps.setString(4, customer.getCustomer_id());

            int rowsAffected = ps.executeUpdate();
            if (rowsAffected != 0) {
                logger.info("Data Updated");
                System.out.println("Data updated");
            } else {
                logger.error("Failed to update");
                System.out.println("Failed to update");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error updating customer data", e);
        }
    }
    public void deleteCustomer(String customerId, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(DELETE_DATA);
            ps.setString(1, customerId);

            int rowsAffected = ps.executeUpdate();
            if (rowsAffected != 0) {
                logger.info("Data Deleted");
                System.out.println("Data deleted");
            } else {
                logger.error("Failed to delete. Customer not found.");
                System.out.println("Failed to delete");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error deleting customer data", e);
        }
    }
}