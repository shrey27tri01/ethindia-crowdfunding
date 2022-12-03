 pragma solidity ^0.8.12;
000000000000000000

 import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

 contract Test1 is ERC20{
     address public admin;
     constructor() ERC20('Testing Token', 'TKFT'){
         _mint(msg.sender, 100 * 10 ** 18);
         admin = msg.sender;

     }

     function mint(address to, uint amount) external{
         require(msg.sender == admin, 'Only admin');
         _mint(to, amount);
     }

     function burn(uint amount) external{
         _burn(msg.sender, amount);
     }
 }