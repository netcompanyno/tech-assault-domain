import matchService from '../services/matchService';

export default function getActiveMatchController(request, reply) {
    const { userId } = request.params;

    matchService.getActiveMatchByUserId(userId)
        .then((activeMatch) => {
            if (!activeMatch) {
                return reply().code(404);
            }

            return reply(activeMatch);
        })
        .catch(err => { console.log(err); });
}