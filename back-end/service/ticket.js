const { last } = require("lodash");
const db = require("../Models");
const Ticket = db.Ticket;

class TicketService {
    
    static getAvailableStatus(){
        return ["open","in_progress", "closed"] || [];
    };
    static nextStatus(currentStatus) {
        const flow = {
            open: "in_progress",
            in_progress: "closed",
            closed: null,
        };
        return flow[currentStatus] || null;
    }
    static async listTickets(data) {
        try {
            const page = parseInt(data.page) || 1;
            const limit = parseInt(data.limit) || 5;
            const offset = (page - 1) * limit;
            const { count, rows } = await Ticket.findAndCountAll({
                order: [["created_at", "DESC"]],
                limit,
                offset,
            });
            const enrichedRows = rows.map((ticket) => {
                return {
                id: ticket.id,
                title: ticket.title,
                description: ticket.description,
                priority: ticket.priority,
                status: ticket.status,
                created_at: ticket.created_at,
                last_updated: ticket.modified_at,
                };
            });

            return {
                tickets: enrichedRows,
                available_status: TicketService.getAvailableStatus(),
                total_pages: Math.ceil(count / limit),
            };
        } catch (err) {
            console.error("List tickets error:", err);
            return {
                tickets: [],
                total_pages: 1,
                available_status: [],
            };
        }
    }
    static async createTicket(data) {
        try {
            const userData = {
                title: data.title,
                description: data.description || '',
                priority: (data.priority || 'low').toLowerCase(), 
            };

            const ticket = await Ticket.create(userData);
            return {
                is_done: true,
                message: "Ticket created successfully",
                data: {
                id: ticket.id,
                title: ticket.title,
                priority: ticket.priority,
                status: ticket.status
                }
            };
        } catch (err) {
            console.error("Create Ticket Error:", err);
            return {
                is_done: false,
                message: "Failed to create ticket",
            };
        }
    }
    static async moveToNextStatus(data) {
        try {
            const ticket = await Ticket.findOne({ where: { id: data.id } });
            if (!ticket) {
            return {
                is_done: false,
                message: "Ticket not found",
            };
            }
            const next = TicketService.nextStatus(ticket.status);
            if (!next) {
            return {
                is_done: false,
                message: "Ticket is already closed",
                updated_status: ticket.status,
                last_updated: ticket.modified_at,
            };
            }
            await ticket.update({ status: next });
            return {
                is_done: true,
                message: "Ticket status updated",
                updated_status: next,
                last_updated: ticket.modified_at,
            };
        } catch (err) {
            console.error("Error moving to next status:", err);
            return {
                is_done: false,
                message: "Failed to update status",
            };
        }
    }
    
}

module.exports = TicketService;
