import React from 'react'
import { Button } from 'reactstrap'

const Market = () => {
  return (
    <div className="left_bar">
      <div className="market_box">
        <div className="all_title title">Маркет</div>
        <div>
          <div className="market_base_container">
            <div className="up">
              <Button
                href="javascript:void(0)"
                value="top"
                onClick="changeMarketBase('top')"
                className="active"
              >
                TOP
              </Button>
              <a href="javascript:void(0)" value="btc" onClick="changeMarketBase('btc')">
                BTC
              </a>
              <a href="javascript:void(0)" value="eth" onClick="changeMarketBase('eth')">
                ETH
              </a>
              <a href="javascript:void(0)" value="doge" onClick="changeMarketBase('doge')">
                DOGE
              </a>
              <a
                href="javascript:void(0)"
                value="usd"
                onClick="changeMarketBase('usd')"
                className="manimr"
              >
                USD
              </a>
              <a href="javascript:void(0)" value="rur" onClick="changeMarketBase('rur')">
                RUR
              </a>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Market
