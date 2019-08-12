import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatTableModule, MatDialogModule, MatSelectModule, MatRadioModule, MatFormFieldModule, MatDatepickerModule, MatToolbarModule, MatInputModule, MatMenuModule, MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { PaymentsComponent } from './main/payments/payments.component';
import { RestCommonService } from './services/rest-common.service';
import { CustomSortComponent } from './main/custom-sort/custom-sort.component';
import { CashComponent } from './main/create-payment/cash/cash.component';
import { CheckComponent } from './main/create-payment/check/check.component';
import { CardComponent } from './main/create-payment/card/card.component';
import { TransferComponent } from './main/create-payment/transfer/transfer.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { InputValidatorService } from './services/input-validator.service';

const appRoutes: Routes = [
    {
         path: '**', 
         component: PaymentsComponent
    }
];

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: false,
    decimal: ",",
    precision: 2,
    prefix: "$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
    declarations: [
        AppComponent,
        PaymentsComponent,
        CustomSortComponent,
        CashComponent,
        CheckComponent,
        CardComponent,
        TransferComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        CurrencyMaskModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule,
        MatRadioModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatInputModule,
        MatMenuModule,
        MatSnackBarModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule
    ],
    providers: [
        RestCommonService,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        InputValidatorService
    ],
    entryComponents: [
        CustomSortComponent,
        CashComponent,
        CheckComponent,
        CardComponent,
        TransferComponent
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
