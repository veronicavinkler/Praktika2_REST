const ActivityLog = require("../models/activityLog.model");

/**
 * Logib kasutaja tegevuse andmebaasi.
 * @param {Object} req - Expressi päring, mis sisaldab kasutaja ID-d ja IP-aadressi.
 * @param {string} action - Tegevuse tüüp (nt CREATE, UPDATE, DELETE).
 * @param {string|null} entityType - Entiteedi tüüp (nt Article, User).
 * @param {number|null} entityId - Entiteedi ID, millega tegevus on seotud.
 * @param {string|null} details - Lisainfo tegevuse kohta.
 */
async function logActivity(req, action, entityType = null, entityId = null, details = null) {
    try {
        // Kontrolli, kas kasutaja ID on saadaval
        if (!req.userId) {
            console.warn("User ID is missing in the request. Activity will not be logged.");
            return;
        }

        // Logi tegevus andmebaasi
        await ActivityLog.create({
            user_id: req.userId,
            action: action,
            entity_type: entityType,
            entity_id: entityId,
            details: details,
            ip_address: req.ip || "Unknown IP",
        });
    } catch (error) {
        console.error("Failed to log activity:", error.message);
    }
}

module.exports = logActivity;