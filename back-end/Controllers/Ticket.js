const { validateTicket } = require("../Utils/validation/validate");
const TicketService = require("../service/ticket");


async function list(req, res, next) {
    
    try {
        const { error, data } = validateTicket(req.query, "list");
        if (error) {
            const messages = error.details.map(e => e.message);
            return res.status(400).json({ status: "error", message: messages[0],  errors: messages });
        }
        const result = await TicketService.listTickets(data);
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
}
async function create(req, res, next) {
    
    try {
        const { error, data } = validateTicket(req.body, "create");
        if (error) {
            const messages = error.details.map(e => e.message);
            return res.status(400).json({ status: "error", message: messages[0],  errors: messages });
        }
        const result = await TicketService.createTicket(data);
        if (result.is_done) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (err) {
        return next(err);
    }
}
async function nextStatus(req, res, next) {
    
    try {
        const { error, data } = validateTicket(req.params, "status_update");
        if (error) {
            const messages = error.details.map(e => e.message);
            return res.status(400).json({ status: "error", message: messages[0],  errors: messages });
        }
        const result = await TicketService.moveToNextStatus(data);
        if (!result.is_done) return res.status(400).json({message: result.message,current_status: result.updated_status ,last_updated: result.last_updated || null});
        return res.status(200).json({ message: result.message, current_status: result.updated_status, last_updated: result.last_updated || null });
    } catch (err) {
        return next(err);
    }
}
module.exports = {
    list,
    create,
    nextStatus
};