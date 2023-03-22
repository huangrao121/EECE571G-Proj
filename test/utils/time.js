async function advanceTimeAndBlock(provider, time) {
    await advanceTime(provider, time);
    await advanceBlock(provider);
  
    return Promise.resolve(provider.getBlock("latest"));
  }
  
  async function advanceTime(provider, time) {
    await provider.send("evm_increaseTime", [time]);
  }
  
  async function advanceBlock(provider) {
    await provider.send("evm_mine");
  }
  
  module.exports = {
    advanceTime,
    advanceBlock,
    advanceTimeAndBlock,
  };
  