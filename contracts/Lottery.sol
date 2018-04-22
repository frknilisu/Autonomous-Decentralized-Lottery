pragma solidity ^0.4.4;


contract Lottery {

	enum TicketType { Full, Half, Quarter }		// types of Ticket

	struct Ticket {
		address owner;				// purchaser of the Ticket
		TicketType ttype;			// type of the Ticket
		bool is_verified;			// verifying flag for the Ticket
		int[] rand_nums;			// random numbers submitted by purchaser to verify with hashes
		bytes32[] rand_hashes;		// hashes of random numbers submitted by purchaser while a ticket purchasing
	}

	// constant ticket prices
	uint constant full_pay = 8 finney;
	uint constant half_pay = 4 finney;
	uint constant quarter_pay = 2 finney;

	
	uint constant block_period = 50;	// constant block period


	/* 	
		*********************************************************************
		*																	*
		*							VARIABLES								*
		*																	*
		*********************************************************************
	*/

	mapping(uint => mapping(address => Ticket[])) purchased_tickets;	// map purchaser to Tickets he buy, for indexed lottery
	mapping(string => uint[3]) used_randoms;			// keep random numbers to prevent use again, for each TicketType
	mapping(address => uint) balance_of_purchasers;		// balance of purchasers' in the contract


	uint public purchase_end;	// block number of purchase stage end
	uint public	reveal_end;		// block number of reveal stage end
	uint public initial_block_num;	// block number of the contract at the start
    uint public lottery_no;		// current lottery number
	uint[] public lottery_balance;	// current balances of lotteries

	
    Ticket[] revealed_tickets;	// revealed ticket list

    bool first_purchase;


    /* 	
		*********************************************************************
		*																	*
		*							FUNCTIONS								*
		*																	*
		*********************************************************************
	*/

	function Lottery() {
		initial_block_num = block.number;
		purchase_end =	initial_block_num +  block_period;
		reveal_end = purchase_end + block_period;
		lottery_no = 1;
		first_purchase = true;
		lottery_balance.push(1);
		lottery_balance.push(0);
	}


	function buyFullTicket(bytes32[] _rand_hashes) public payable returns (bool) {
		uint block_num = block.number;


		if (block_num >= purchase_end) {
			updateLottery();
		}

		// concatenation of three hashes as string
		//string memory concat_hash = bytes32ArrayToString(_rand_hashes);

		if (msg.value == full_pay) {

			Ticket memory ticket = Ticket({
				owner: msg.sender,
				rand_hashes: _rand_hashes,
				ttype: TicketType.Full,
				is_verified: false,
				rand_nums: new int[](3)			
			});


			/* 
				number of sold Full tickets should be smaller than 1 (there can be only one Full ticket)
				these three random numbers must not for other TicketTypes, since trying buy Full ticket
			*/
			//if ( !(used_randoms[concat_hash][0] < 1 && 
			//	 used_randoms[concat_hash][1] == 0 &&
			//	 used_randoms[concat_hash][2] == 0 )){
			//	revert();
			//} else {

			//	used_randoms[concat_hash][0] += 1;

				purchased_tickets[lottery_no][msg.sender].push(ticket);
				lottery_balance[lottery_no] += msg.value;

				//TicketsBought(msg.sender, msg.value, ticket);
				return true;
			//}

		} else {
			revert();
		}
	}


	function revealTicket(int[] _rand_nums) public returns(bool) {
		uint block_num = block.number;


		if (block_num >= reveal_end) {
			updateLottery();
		}


		// verify three random numbers of purchaser with the ticket via hashes
		for (uint i = 0; i < purchased_tickets[lottery_no-1][msg.sender].length; i++){
			Ticket memory ticket = purchased_tickets[lottery_no-1][msg.sender][i];
			if (!ticket.is_verified){

				bool verify = ( keccak256(_rand_nums[0], msg.sender) == ticket.rand_hashes[0] && 
								keccak256(_rand_nums[1], msg.sender) == ticket.rand_hashes[1] && 
								keccak256(_rand_nums[2], msg.sender) == ticket.rand_hashes[2] );
				if (verify) {
					ticket.is_verified = true;
					ticket.rand_nums = _rand_nums;
					revealed_tickets.push(ticket);
					return true;
				}
			}
		}
		return false;
	}


	function updateLottery() private {

		uint block_num = block.number;
		purchase_end += block_period;
		lottery_balance.push(0);
		

		if (!first_purchase){

			// determine winner random numbers with XOR
			int[] memory winner_numbers = random();

			uint temp_balance = lottery_balance[lottery_no-1];
			for (uint i = 0; i < revealed_tickets.length; i++) {

				Ticket memory ticket = revealed_tickets[i];

				if (ticket.rand_nums[0] == winner_numbers[0]) {
					if (ticket.ttype == TicketType.Full) {
						balance_of_purchasers[ticket.owner] += temp_balance/2;
						lottery_balance[lottery_no-1] -= temp_balance/2;
					} else if (ticket.ttype == TicketType.Half) {
						balance_of_purchasers[ticket.owner] += temp_balance/4;
						lottery_balance[lottery_no-1] -= temp_balance/4;
					} else if (ticket.ttype == TicketType.Quarter) {
						balance_of_purchasers[ticket.owner] += temp_balance/8;
						lottery_balance[lottery_no-1] -= temp_balance/8;
					}
				}

				else if (ticket.rand_nums[1] == winner_numbers[1]) {
					if (ticket.ttype == TicketType.Full) {
						balance_of_purchasers[ticket.owner] += temp_balance/4;
						lottery_balance[lottery_no-1] -= temp_balance/4;
					} else if (ticket.ttype == TicketType.Half) {
						balance_of_purchasers[ticket.owner] += temp_balance/8;
						lottery_balance[lottery_no-1] -= temp_balance/8;
					} else if (ticket.ttype == TicketType.Quarter) {
						balance_of_purchasers[ticket.owner] += temp_balance/16;
						lottery_balance[lottery_no-1] -= temp_balance/16;
					}
				}

				else if (ticket.rand_nums[2] == winner_numbers[2]) {
					if (ticket.ttype == TicketType.Full) {
						balance_of_purchasers[ticket.owner] += temp_balance/8;
						lottery_balance[lottery_no-1] -= temp_balance/8;
					} else if (ticket.ttype == TicketType.Half) {
						balance_of_purchasers[ticket.owner] += temp_balance/16;
						lottery_balance[lottery_no-1] -= temp_balance/16;
					} else if (ticket.ttype == TicketType.Quarter) {
						balance_of_purchasers[ticket.owner] += temp_balance/32;
						lottery_balance[lottery_no-1] -= temp_balance/32;
					}
				}
			}
			lottery_balance[lottery_no] += lottery_balance[lottery_no-1];

			reveal_end += block_period;
			
		} else {
			first_purchase = false;
		}


		lottery_no++;
	}



	function getLotteryBalance() constant public returns(uint) {
    	return lottery_balance[lottery_no];
  	}


	function random() private view returns (int[]) {
		int[] memory winner_numbers = new int[](3);

		winner_numbers[0] = revealed_tickets[0].rand_nums[0];
		winner_numbers[1] = revealed_tickets[0].rand_nums[1];
		winner_numbers[2] = revealed_tickets[0].rand_nums[2];
		for (uint i = 1; i < revealed_tickets.length; i++) {
			winner_numbers[0] ^= revealed_tickets[i].rand_nums[0];
			winner_numbers[1] ^= revealed_tickets[i].rand_nums[1];
			winner_numbers[2] ^= revealed_tickets[i].rand_nums[2];
		}

		return winner_numbers;
	}


	function bytes32ToString(bytes32 x) constant returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    function bytes32ArrayToString(bytes32[] data) constant returns (string) {
        bytes memory bytesString = new bytes(data.length * 32);
        uint urlLength;
        for (uint i=0; i<data.length; i++) {
            for (uint j=0; j<32; j++) {
                byte char = byte(bytes32(uint(data[i]) * 2 ** (8 * j)));
                if (char != 0) {
                    bytesString[urlLength] = char;
                    urlLength += 1;
                }
            }
        }
        bytes memory bytesStringTrimmed = new bytes(urlLength);
        for (i=0; i<urlLength; i++) {
            bytesStringTrimmed[i] = bytesString[i];
        }
        return string(bytesStringTrimmed);
    }



    /* 	
		*********************************************************************
		*																	*
		*								EVENTS								*
		*																	*
		*********************************************************************
	*/

	// Event for when tickets are bought
	//event TicketsBought(address indexed _from, uint _quantity);

	// Event for declaring the winner
	//event AwardWinnings(address _to, uint _winnings);

	// Event for lottery reset
	//event ResetLottery();

}
