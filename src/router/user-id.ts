import {type IncomingMessage, type ServerResponse} from 'node:http';
import {deleteMessage, ErrorMessages, HttpMethods, StatusCode} from '../const';
import {store} from '../store';
import {type InputUser} from '../types/input-user';
import {getReqData, validationData} from '../utils';

export const userIdHandler = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
	switch (req.method) {
		case HttpMethods.GET: {
			const user = store.getUser(userId);

			if (!user) {
				res.writeHead(StatusCode.NOT_FOUND, {'Content-Type': 'application/json'});
				res.end(JSON.stringify({
					error: ErrorMessages.NOT_FOUND_ID,
				}));
				return;
			}

			res.writeHead(StatusCode.OK, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(user));
			break;
		}

		case HttpMethods.PUT: {
			const reqData = await getReqData(req) as string;
			const userData = JSON.parse(reqData) as Record<string, unknown>;

			if (!validationData(userData)) {
				res.writeHead(StatusCode.BAD_REQUEST);
				res.end(JSON.stringify({
					error: ErrorMessages.BAD_REQUEST,
				}));
				return;
			}

			const user = store.updateUser(userId, userData as InputUser);

			if (!user) {
				res.writeHead(StatusCode.NOT_FOUND, {'Content-Type': 'application/json'});
				res.end(JSON.stringify({
					error: ErrorMessages.NOT_FOUND_ID,
				}));
				return;
			}

			res.writeHead(StatusCode.OK, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(user));
			break;
		}

		case HttpMethods.DELETE: {
			const result = store.removeUser(userId);

			if (!result) {
				res.writeHead(StatusCode.NOT_FOUND, {'Content-Type': 'application/json'});
				res.end(JSON.stringify({
					error: ErrorMessages.NOT_FOUND_ID,
				}));
				return;
			}

			res.writeHead(StatusCode.NO_CONTENT, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({
				message: `${deleteMessage}: ${userId}`,
			}));
			break;
		}

		default:
			res.writeHead(StatusCode.NOT_FOUND, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({
				error: ErrorMessages.NOT_FOUND,
			}));
			break;
	}
};
